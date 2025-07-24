'use server'

import request from "./request";

export async function get_user_mails(user: string, from = 1){
    let url: string = process.env.BACKEND_HOST || "http://localhost:5000"
    const path = "/mails/user/" + user + "?from=" + from
    console.log(process.env.BACKEND_HOST)

    url = url+path;

    return request({
        url    
    }).then(res => {
        return {
            "success": true,
            "data": res.data
        }
    }).catch(err => {
        return {
            "success": false,
            "error": err
        }
    })
}

export async function search_user_mails(user: string, search: string){
    let url: string = process.env.BACKEND_HOST || "http://localhost:5000"
    console.log("url: " + url)
    const path = "/mails/user/" + user + "/search/" + search

    url = url+path;

    return request({
        url    
    }).then(res => {
        return {
            "success": true,
            "data": res
        }
    }).catch(err => {
        return {
            "success": false,
            "error": err
        }
    })
}

export async function get_user_mail_by_label(user: string, label: string){
    let url: string = process.env.BACKEND_HOST || "http://localhost:5000"
    const path = "/mails/user/" + user + "/label/" + label

    url = url+path;

    return request({
        url    
    }).then(res => {
        return {
            "success": true,
            "data": res
        }
    }).catch(err => {
        return {
            "success": false,
            "error": err
        }
    })
}

export async function verify_user(user: string, pass: string){
    let url: string = process.env.BACKEND_HOST || "http://localhost:5000"
    const path = "/users/verify"

    url = url+path;

    const body = {
        user,
        pass
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json")

    return request({
        url,
        body: JSON.stringify(body),
        method: "POST",
        headers
    }).then(res => {
        console.log(res)
        if(res.success == true){
            return {
                "success": true,
                "data": res
            }
        }else{
            return {
                "success": false
            }
        }
    }).catch(err => {
        return {
            "success": false,
            "error": err
        }
    })
}

export async function load_user_mails(users: {}){
    let url: string = process.env.BACKEND_HOST || "http://localhost:5000"
    const path = "/mails"

    url = url+path;

    const body = users

    const headers = new Headers();
    headers.append("Content-Type", "application/json")

    return request({
        url,
        body: JSON.stringify(body),
        method: "POST",
        headers
    }).then(res => {
        if(res.success == true){
            return {
                "success": true,
                "data": res
            }
        }else{
            return {
                "success": false
            }
        }
    }).catch(err => {
        return {
            "success": false,
            "error": err
        }
    })

}