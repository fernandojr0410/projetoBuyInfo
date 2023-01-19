const token = "e82b7ce9aefe9ea912d47c59cf8875";

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
                allProducts {
                    id, preco, nome, descricao, ativo, 
                brand {
                    id, nome
                },
                category {
                    id, nome
                }, 
                imagens {
                    id, url
                },
                _createdAt
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