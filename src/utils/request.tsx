interface RequestParams {
    url: string | URL,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    headers?: {},
    body?: string
}

export default async function request({ url, method = "GET", body, headers}: RequestParams): Promise<RequestParams>{
    let params: any = {}
    params.method = method

    params.headers = {
        ...params.headers,
        ...headers
    }

     if(body){
        params.body = body
    }

    let status = true
    let statusCode = 0

    return new Promise((resolve, reject) => {
        try{
            fetch(url, params)
                .then(res => {
                    if(res.ok){
                        status = true
                    }else{
                        status = false
                    }
                    statusCode = res.status
                    return res.json()
                })
                .then(res => {
                    resolve({
                        status,
                        statusCode,
                        data: res
                    })
                })
                .catch(err => {
                    reject({
                        status,
                        statusCode: 0,
                    })
                })
        }catch(err){
            reject({
                status: false,
                statusCode: 0,
            })
        }
    })
}