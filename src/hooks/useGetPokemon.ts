import { gql, useQuery } from '@apollo/client';

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      image
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
    }
  }
`;

export const useGetPokemon = (name: string) => {
  return useQuery(GET_POKEMON, {
    variables: { name },
    skip: !name,
  });
};
