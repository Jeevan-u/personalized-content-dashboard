type ShowCardProps = {
  title: string;
  description: string;
  image: string | null;
  rating: number | null;
  link: string;
};

export default function ShowCard({ title, description, image, rating, link }: ShowCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {image ? <img src={image} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-sm text-gray-400">No image available</div>}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        {rating !== null && <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">★ {rating}</span>}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
        <a href={link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition hover:gap-2 dark:text-white">View show <span>↗</span></a>
      </div>
    </article>
  );
}
