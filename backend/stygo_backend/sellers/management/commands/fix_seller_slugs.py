from django.core.management.base import BaseCommand
from sellers.models import SellerProfile
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Fix missing or duplicate slugs for sellers'

    def handle(self, *args, **kwargs):
        for seller in SellerProfile.objects.all():
            if not seller.slug:
                base_slug = slugify(seller.shop_name)
                unique_slug = base_slug
                num = 1
                while SellerProfile.objects.filter(slug=unique_slug).exists():
                    unique_slug = f"{base_slug}-{num}"
                    num += 1
                seller.slug = unique_slug
                seller.save()
                self.stdout.write(f"Slug set for {seller.shop_name}: {seller.slug}")
