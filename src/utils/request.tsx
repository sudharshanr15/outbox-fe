interface RequestParams {
    url: string | URL,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    headers?: {},
    body?: string
}

export default async function request({ url, method = "GET", body, headers}: RequestParams){
    let params: any = {}
    params.method = method

    params.headers = {
        ...params.headers,
        ...headers
    }

     if(body){
        params.body = body
    }

    return new Promise((resolve, reject) => {
        try{
            fetch(url, params)
                .then(res => {
                    if(!res.ok){
                        throw new Error("Error fetching mail")
                    }
                    
                    return res.json()
                })
                .then(res => {
                    resolve({
                        success: true,
                        data: res
                    });
                })
                .catch(err => {
                    reject({
                        success: false,
                    })
                })
        }catch(err){
            reject({
                success: false,
            })
        }
    })
}