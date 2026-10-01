type ShowCardProps = {
  title: string;
  description: string;
  image: string | null;
  rating: number | null;
  link: string;
};

export default function ShowCard({ title, description, image, rating, link }: ShowCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="h-72 w-full bg-gray-100 dark:bg-gray-800">
        {image ? <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-gray-400">No image available</div>}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {rating !== null && <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">★ {rating}</span>}
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
        <a href={link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium underline underline-offset-4">View show</a>
      </div>
    </article>
  );
}
