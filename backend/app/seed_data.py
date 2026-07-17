from app.database.connection import SessionLocal
from app.models.experience_model import Experience
from app.models.guide_model import Guide


def seed():
    db = SessionLocal()

    experiences = [
        Experience(query="camping", title="Riverside Camping Under the Stars", destination="Rishikesh", category="Camping", description="A peaceful night camping by the Ganges with bonfire and local food.", author="Rohan", likes=42),
        Experience(query="trekking", title="Kheerganga Trek from Kasol", destination="Kasol", category="Trekking", description="A moderate trek through pine forests ending at natural hot springs.", author="Ananya", likes=88),
        Experience(query="nightlife", title="Best Beach Shacks in North Goa", destination="Goa", category="Nightlife", description="Live music, sunset views, and the best cocktails in Baga and Anjuna.", author="Karan", likes=120),
        Experience(query="cafes", title="Hidden Cafes of Old Manali", destination="Manali", category="Cafes", description="Cozy cafes with mountain views, perfect for slow mornings.", author="Priya", likes=65),
        Experience(query="river rafting", title="White Water Rafting in Rishikesh", destination="Rishikesh", category="River Rafting", description="Grade III-IV rapids for an adrenaline-packed half day.", author="Vikram", likes=97),
        Experience(query="solo trips", title="Solo Backpacking Through Spiti Valley", destination="Spiti Valley", category="Solo Trips", description="A 7-day solo journey through India's cold desert.", author="Simran", likes=143),
        Experience(query="hidden gems", title="Untouched Beaches South of Goa", destination="Goa", category="Hidden Gems", description="Quiet beaches away from the tourist crowd.", author="Neha", likes=76),
    ]

    guides = [
        Guide(query="budget guide", title="Manali on ₹3000: A Complete Budget Guide", destination="Manali", category="Budget Guides", content="A day-by-day breakdown of stay, food, and travel costs.", author="Rohit Backpacker", reading_time=6),
        Guide(query="safety guide", title="Solo Female Travel Safety Tips for Goa", destination="Goa", category="Safety Guides", content="Practical safety advice from experienced solo travelers.", author="Pooja Iyer", reading_time=5),
        Guide(query="packing list", title="The Ultimate Ladakh Packing List", destination="Leh Ladakh", category="Packing Lists", content="Everything you need for high-altitude travel, and what to skip.", author="Vikram Malhotra", reading_time=4),
        Guide(query="food guide", title="Street Food Trail of Varanasi", destination="Varanasi", category="Food Guides", content="Where to eat the best kachori, chaat, and lassi in the old city.", author="Ananya Verma", reading_time=5),
        Guide(query="itinerary", title="Perfect 5-Day Kasol-Manali Itinerary", destination="Kasol", category="Itineraries", content="A tried and tested route covering both towns without rushing.", author="Karan Thapa", reading_time=7),
        Guide(query="best time to visit", title="Best Time to Visit Spiti Valley", destination="Spiti Valley", category="Best Time to Visit", content="Month-by-month breakdown of weather and road conditions.", author="Rohan", reading_time=3),
    ]

    db.add_all(experiences)
    db.add_all(guides)
    db.commit()
    db.close()

    print(f"Seeded {len(experiences)} experiences and {len(guides)} guides.")


if __name__ == "__main__":
    seed()