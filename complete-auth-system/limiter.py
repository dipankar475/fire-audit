import time

class RateLimiter:
    """In-memory rate limiter tracking timestamps per key (IP address or email)."""
    def __init__(self, max_requests: int = 5, window_seconds: int = 300):
        # Default: 5 requests per 5 minutes
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = {}  # key -> list of float timestamps

    def is_rate_limited(self, key: str) -> bool:
        """Increment count for key and return True if limit exceeded within window."""
        now = time.time()
        
        # Initialize key if not exists
        if key not in self.requests:
            self.requests[key] = []
            
        # Filter out timestamps older than window duration
        self.requests[key] = [t for t in self.requests[key] if now - t < self.window_seconds]
        
        # Check if limit exceeded
        if len(self.requests[key]) >= self.max_requests:
            return True
            
        # Append current request timestamp
        self.requests[key].append(now)
        return False

    def get_remaining_seconds(self, key: str) -> int:
        """Get remaining seconds until rate limit resets for key."""
        if key not in self.requests or not self.requests[key]:
            return 0
        now = time.time()
        # Clean expired timestamps first
        self.requests[key] = [t for t in self.requests[key] if now - t < self.window_seconds]
        if not self.requests[key]:
            return 0
            
        oldest_timestamp = self.requests[key][0]
        remaining = int(self.window_seconds - (now - oldest_timestamp))
        return max(0, remaining)
