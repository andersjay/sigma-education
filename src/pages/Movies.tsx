import { gql, useQuery } from "@apollo/client";
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
  const { data, loading } = useQuery<GelAllCategoriesResponse>(GET_ALL_CATEGORIES)

  console.log(data)

  if (loading) return <p>Loading...</p>




  return (
    <section className="w-auto">
      {data?.categories.map(c => {
        return (
          <div className="w-full pl-8">
            <h2 className="font-bold text-2xl">{c.nome}</h2>
            <ul className="flex gap-10 mt-4">
              {c.movies.map(m => (
                <li className="w-52 ">

                  <img className="w-full max-w-[200px]" src={m.image} alt="" />
                  <h5 className="text-center">{m.name}</h5>
                </li>
              ))}

              <li className="w-52 ">

                <img className="w-full max-w-[200px]" src='' alt="" />
                <h5 className="text-center">Teste</h5>
              </li>
            </ul>
          </div>
        )
      })}


    </section>
  )
}