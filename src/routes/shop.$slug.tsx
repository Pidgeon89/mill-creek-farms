import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AddToCart } from "@/components/product/AddToCart";
import { getProduct, products } from "@/data/products";
import { money } from "@/lib/utils";

export const Route = createFileRoute("/shop/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) throw notFound();
  const related = products.filter((p) => p.slug !== slug && p.category === product.category).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span> / {product.category}</span>
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover shadow-[var(--shadow-border)]"
        />
        <div>
          <h1 className="font-display text-4xl">{product.name}</h1>
          <p className="mt-2 text-muted">
            {product.weight} · {product.origin}
          </p>
          <p className="mt-6 text-3xl font-medium tabular-nums">{money(product.retail)}</p>
          <p className="mt-6 text-base leading-relaxed text-muted">{product.description}</p>
          <p className="mt-4 text-sm text-muted">
            <span className="font-medium text-ink">Ingredients.</span> {product.ingredients}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Grown and packed on this farm. A bag that still tastes like the grove.
          </p>
          <div className="mt-8 max-w-xs">
            <AddToCart slug={product.slug} />
          </div>
        </div>
      </div>
      {related.length ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl">Also from this table</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="overflow-hidden rounded-xl bg-cream/40 shadow-[var(--shadow-border)]"
              >
                <img src={p.image} alt="" className="aspect-photo w-full object-cover" />
                <div className="p-3">
                  <p className="font-display">{p.name}</p>
                  <p className="text-sm tabular-nums text-muted">{money(p.retail)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
