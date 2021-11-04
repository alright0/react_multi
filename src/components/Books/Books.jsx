import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import s from "./Books.module.css";
//import getBooks from "../../api/queries/books.graphql";

class Books extends Component {
  render() {
    console.log(this.props);

    return (
      <div className={s.container}>
        {this.props.data.loading === true
          ? "Loading"
          : this.props.data.books.edges.map((data) => (
              <div className={s.category}>
                <p>Категория</p>
                {data.node.category}
                <div className={s.author}>
                  <p>Автор</p>
                  {data.node.author}
                  <div className={s.title}>
                    <p>Произведение</p>
                    {data.node.title}
                  </div>
                </div>
              </div>
            ))}
      </div>
    );
  }
}

const booksQuery = gql`
  query getBooks {
    books {
      edges {
        node {
          id
          title
          author
          category
        }
      }
    }
  }
`;

const books = graphql(booksQuery)(Books);

export default books;
