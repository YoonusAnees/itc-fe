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
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070604] px-6 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%)]" />

                <div className="relative rounded-[34px] border border-[#d4af37]/20 bg-white/[0.04] px-12 py-14 text-center shadow-[0_25px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-3xl text-[#d4af37]">
                        ✦
                    </div>

                    <h1 className="text-3xl font-black">Product not found</h1>
                    <p className="mt-3 text-white/55">
                        This jewelry item may have been removed or is currently unavailable.
                    </p>
                </div>
            </main>
        );
    }

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const whatsappMessage = encodeURIComponent(
        `Hi, I want to inquire about this jewelry:\n\n${product.name}`
    );

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#070604] text-white">
            {/* BACKGROUND ART */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-180px] top-[-160px] h-[440px] w-[440px] rounded-full bg-[#d4af37]/20 blur-[120px]" />
                <div className="absolute right-[-180px] top-[180px] h-[520px] w-[520px] rounded-full bg-[#8a6b18]/25 blur-[130px]" />
                <div className="absolute bottom-[-220px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[140px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_40%)]" />

                <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:46px_46px]" />
            </div>

            <section className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
                {/* LEFT GALLERY */}
                <div className="relative rounded-[38px] border border-[#d4af37]/20 bg-white/[0.035] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                    <div className="pointer-events-none absolute inset-0 rounded-[38px] bg-gradient-to-br from-[#d4af37]/16 via-transparent to-transparent" />
                    <div className="relative z-10">
                        <ProductGallery images={product.images} alt={product.name} />
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="relative overflow-hidden rounded-[38px] border border-[#d4af37]/20 bg-white/[0.04] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
                    <div className="absolute right-[-70px] top-[-80px] h-56 w-56 rounded-full border border-[#d4af37]/25" />
                    <div className="absolute bottom-[-80px] left-[-80px] h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

                    <div className="relative z-10">
                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
                            {product.purity} Gold
                        </p>

                        <h1 className="text-2xl font-black leading-tight text-white sm:text-5xl">
                            {product.name}
                        </h1>

                        <p className="mt-6 leading-8 text-white/60">
                            {product.description}
                        </p>

                        {/* DETAILS CARD */}
                        <div className="mt-10 grid gap-4 rounded-[30px] border border-[#d4af37]/18 bg-black/25 p-6">
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/45">Weight</span>
                                <span className="font-bold text-white">{product.weight}g</span>
                            </div>

                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/45">Purity</span>
                                <span className="font-bold text-white">{product.purity}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-white/45">Availability</span>
                                <span className="font-bold text-[#f5d676]">
                                    {product.availability}
                                </span>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            <a
                                href={`https://wa.me/${number}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-[#d4af37] px-6 py-4 text-center font-black text-black shadow-[0_12px_35px_rgba(212,175,55,0.25)] transition hover:-translate-y-1 hover:bg-[#f5d676]"
                            >
                                WhatsApp Inquiry
                            </a>

                            <div className="rounded-full border border-[#d4af37]/25 bg-white/[0.05] transition hover:-translate-y-1 hover:bg-white/[0.08]">
                                <AddQuotationButton product={product} />
                            </div>

                            {/* <div className="rounded-full border border-white/10 bg-white/[0.05] transition hover:-translate-y-1 hover:border-[#d4af37]/30 hover:bg-white/[0.08]">
                                <InquiryModal product={product} type="Inquiry" />
                            </div> */}

                            {/* <div className="rounded-full border border-white/10 bg-white/[0.05] transition hover:-translate-y-1 hover:border-[#d4af37]/30 hover:bg-white/[0.08]">
                                <InquiryModal product={product} type="Call Request" />
                            </div> */}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f5d676]">
                                ITC Gold House
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/65">
                                Premium Jewelry
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/65">
                                Luxury Finish
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}