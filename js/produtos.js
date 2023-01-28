const token = "e82b7ce9aefe9ea912d47c59cf8875";
const categoria = 92917538;

fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        query: `
        {
            allProducts(filter: {category: {eq: ${categoria}}}) {
              id, preco, nome, descricao, ativo, 
              brand {
                  id, nome
              },
                             productHighlight {
                                id, nome
                          }
              category {
                  id, nome
              }, 
              imagens {
                  id, url
              },
              _createdAt
            },
            category(filter: {id: {eq: ${categoria}}) {
              id, nome, 
              imagem {
                id, url
              }
            }
          }
        `,
    }),
})
    .then((res) => res.json())
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    });