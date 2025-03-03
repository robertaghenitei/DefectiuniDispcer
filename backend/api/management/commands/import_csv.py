import csv
import os
from django.core.management.base import BaseCommand
from api.models import Region, Address

class Command(BaseCommand):
    help = "Import regions and addresses from CSV files"

    def handle(self, *args, **kwargs):
        base_path = os.path.dirname(os.path.abspath(__file__))

        # Import Regions
        with open(os.path.join(base_path, "regions.csv"), newline='', encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                region, created = Region.objects.get_or_create(id=row["id"], name=row["name"])
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Added region: {region.name}"))


        # Import Addresses
        with open(os.path.join(base_path, "addresses.csv"), newline='', encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                region = Region.objects.get(id=row["region_id"])  # Ensure region exists
                address, created = Address.objects.get_or_create(id=row["id"], name=row["name"], region=region)
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Added address: {address.name} in {region.name}"))

        self.stdout.write(self.style.SUCCESS("CSV import complete!"))
