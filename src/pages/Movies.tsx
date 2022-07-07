import { gql, useQuery } from "@apollo/client";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
const GET_ALL_CATEGORIES = gql`
query{
  categories {
    nome
    movies {
      name
      image
    }
  }
}

`;

interface GelAllCategoriesResponse {
  categories: {
    nome: String;
    movies: {
      name: String;
      image: String
    }[]
  }[]
}

export function Movies() {

  const [scrollX, setScrollX] = useState(0);

  const { data, loading } = useQuery<GelAllCategoriesResponse>(GET_ALL_CATEGORIES)


  // pegar o comprimento de movies de todos as categories 
  const totalMovies = data?.categories.reduce((acc, curr) => {
    return acc + curr.movies.length
  }
    , 0)

  console.log(totalMovies)

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2)
    if (x > 0) {
      x = 0;
    }

    setScrollX(x)

  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2)
    let listW = totalMovies * 200;
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }

    setScrollX(x)

  }

  const truncateText = (text: string) => {
    if (text.length > 16) {
      return text.substring(0, 16) + "..."
    }
    return text
  }




  if (loading) return <p>Loading...</p>

  return (
    <section className="overflow-x-hidden">
      {data?.categories.map(c => {
        return (
          <>

            <div className={`group pl-8 h-full py-9`}>
              <CaretLeft
                onClick={handleLeftArrow}
                size={32}
                color="white"
                className="w-10 h-[255px] bg-zinc-900/50 absolute z-50 flex items-center justify-center mt-[48px] overflow-hidden cursor-pointer opacity-0 transition left-0 group-hover:opacity-100" />
              <CaretRight
                onClick={handleRightArrow}
                size={32}
                color="white"
                className="w-10 h-[255px] bg-zinc-900/50 absolute z-50 flex items-center justify-center mt-[48px] overflow-hidden cursor-pointer opacity-0 transition right-0 group-hover:opacity-100" />
              <h2 className="font-bold text-2xl">{c.nome}</h2>

              <ul className={`flex gap-10 mt-4 transition-all`} style={{ marginLeft: scrollX, width: totalMovies * 200 }}>
                {c.movies.map(m => (
                  <li className="w-52 flex h-full flex-col gap-2">

                    <img className="w-full max-w-[200px] scale-95 hover:scale-100 transition-all rounded" src={m.image} alt="" />
                    <h5 className="text-center" title={`${m.name}`}>{m.name.length > 16 ? truncateText(`${m.name}`) : m.name}</h5>
                    <a href="/" className=" py-2 rounded-sm px-1 text-center font-medium bg-yellow-500">Ver</a>
                  </li>
                ))}

              </ul>
            </div>
          </>
        )
      })}


    </section>
  )
}