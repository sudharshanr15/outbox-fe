import { get_item } from "./local_storage";
import request from "./request";

export function add_user_account(user: string, pass: string){
    let current_users: string | null = localStorage.getItem("users");

    let new_val: {
        [key: string]: {
            "user": string,
            "pass": string
        }
    }
    if(current_users == null){
        new_val = {}
    }else{
        new_val = JSON.parse(current_users)
    }

    new_val[user] = {user, pass}

    localStorage.setItem("users", JSON.stringify(new_val));
}

export function get_user_accounts(){
    return get_item("users")
}

export function get_user_mails(user: string, from = 1){
    let url: string = "http://localhost:5000"
    console.log("url: " + url)
    const path = "/mails/user/" + user + "?from=" + from

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

export function search_user_mails(user: string, search: string){
    let url: string = "http://localhost:5000"
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

export function get_user_mail_by_label(user: string, label: string){
    let url: string = "http://localhost:5000"
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

export function verify_user(user: string, pass: string){
    let url: string = "http://localhost:5000"
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

export function load_user_mails(users: {}){
    let url: string = "http://localhost:5000"
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