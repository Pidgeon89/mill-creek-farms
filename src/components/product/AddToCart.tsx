import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/products";
import { useCart } from "@/lib/cart";

export function AddToCart({ slug }: { slug: string }) {
  const add = useCart((s) => s.add);
  return (
    <Button
      className="w-full"
      onClick={() => {
        add(slug);
        const p = getProduct(slug);
        toast.success(p ? `${p.name} added to the crate` : "Added");
      }}
    >
      Add to crate
    </Button>
  );
}
