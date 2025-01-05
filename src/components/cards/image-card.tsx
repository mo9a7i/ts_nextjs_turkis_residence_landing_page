"use client";

interface ImageCardProps {
    image: string;
    children: React.ReactNode;
    className?: string;
}

export function ImageCard({ image, children, className = "" }: ImageCardProps) {
    return (
        <div className={`overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02] ${className}`}>
            <div className="relative bg-cover bg-center p-8 min-h-[25vh] flex items-start justify-end flex-col" style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-10% from-black/80 to-transparent " />
                <div className="relative z-10 text-white justify-end">{children}</div>
            </div>
        </div>
    );
}
