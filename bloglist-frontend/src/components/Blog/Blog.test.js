import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
    let container;
    
    beforeEach(() => {
        const blog = {
            title: "a new fresh blog",
            author: "newton adk",
            url: "not posted yet",
        }
        const update = jest.fn();
        const del = jest.fn();
        const username = "";
        container = render(<Blog 
                blog={blog} 
                update={update} 
                del={del} 
                username={username} 
            />).container
    })

    test("renders the title and author by default", () => {
        const title = container.querySelector(".title");
        const author = container.querySelector(".author");

        expect(title).toBeDefined();
        expect(author).toBeDefined();
    })

    test("doesn't render url and likes by default", () => {
        const url = container.querySelector(".url");
        const likes = container.querySelector(".likes");
        
        expect(url).toBe(null);
        expect(likes).toBe(null);

    })

    // test("url and likes are shown when the details is pressed", () => {
    //     const url = container.querySelector(".url");
    //     const likes = container.querySelector(".likes");
    //     const details = 
    // })
})