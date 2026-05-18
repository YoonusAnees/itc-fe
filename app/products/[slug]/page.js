import InquiryModal from "../../components/InquiryModal";
import AddQuotationButton from "./AddQuotationButton";
import ProductGallery from "./ProductGallery";

async function getProduct(slug) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            console.error(`Failed to fetch product. Status: ${res.status}`);
            return null;
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}

export default async function ProductPage({ params }) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.slug);

    if (!product) {
        return (
            <div className="p-20 text-center">
                Product not found
            </div>
        );
    }

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const whatsappMessage = encodeURIComponent(
        `Hi, I want to inquire about this jewelry:\n\n${product.name}`
    );

    return (
        <main className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
            <ProductGallery images={product.images} alt={product.name} />

            <div>
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d4af37]">
                    {product.purity} Gold
                </p>

                <h1 className="text-5xl font-black">
                    {product.name}
                </h1>

                <p className="mt-6 text-gray-600">
                    {product.description}
                </p>

                <div className="mt-10 grid gap-4 rounded-[30px] luxury-card p-6">
                    <div className="flex justify-between border-b border-black/5 pb-3">
                        <span className="text-gray-500">Weight</span>
                        <span className="font-medium">{product.weight}g</span>
                    </div>

                    <div className="flex justify-between border-b border-black/5 pb-3">
                        <span className="text-gray-500">Purity</span>
                        <span className="font-medium">{product.purity}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Availability</span>
                        <span className="font-medium">{product.availability}</span>
                    </div>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    <a
                        href={`https://wa.me/${number}?text=${whatsappMessage}`}
                        target="_blank"
                        className="rounded-full bg-[#d4af37] px-6 py-4 text-center font-bold text-black"
                    >
                        WhatsApp Inquiry
                    </a>

                    <AddQuotationButton product={product} />

                    <InquiryModal
                        product={product}
                        type="Inquiry"
                    />

                    <InquiryModal
                        product={product}
                        type="Call Request"
                    />
                </div>
            </div>
        </main>
    );
}