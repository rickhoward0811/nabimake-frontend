export default function CategoryFilter({ categorias, categoriaAtiva, onCategoriaChange }) {
  return (
    <section className="mb-8 flex flex-wrap gap-3">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          onClick={() => onCategoriaChange(categoria)}
          className={`
            rounded-full
            border
            px-5
            py-2.5
            text-sm
            transition-all
            duration-200
            ${
              categoriaAtiva === categoria
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-pink-50 hover:border-pink-300 text-gray-700"
            }
          `}
        >
          {categoria}
        </button>
      ))}
    </section>
  );
}