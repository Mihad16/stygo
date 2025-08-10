import { useParams } from "react-router-dom";

export default function SellerAbout() {
  const { shopSlug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        About {shopSlug ? shopSlug : "Our Shop"}
      </h1>
      <p>
        Welcome to {shopSlug}! We sell high-quality products and focus on
        customer satisfaction.
      </p>
    </div>
  );
}
