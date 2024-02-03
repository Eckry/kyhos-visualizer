import { useParams } from "react-router-dom";
import React from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { days } from "../constants.json";
import NoProblems from "./NoProblems";
import "./styles/User.css";

export default function User() {
  const { user } = useParams();
  const [data, isLoading] = useUser(user);

  if (isLoading) {
    return (
      <main className="users-container">
        <h1>{user}</h1>
        <Loading />
        <Link className="go-back" to={"/"}>
          Go back
        </Link>
      </main>
    );
  }

  const dynamicStyleRating = (rating, max) => {
    return { color: rating === max ? "var(--highlight-color-two)" : "white" };
  };

  return (
    <>
      <header className="user-header">
        {Object.keys(data).map((date) => {
          return (
            <a key={date} className="header-link" href={`#${Number(date) + 1}`}>
              Semana {Number(date) + 1}
            </a>
          );
        })}
      </header>
      <main className="users-container">
        <h1 className="profile-link">
          <a className="profile-anchor" target="_blank" href={`https://codeforces.com/profile/${user}`}>
            {user}
          </a>
        </h1>
        <ul className="problems-container">
          {Object.keys(data).map((date) => {
            let counter = 0;
            return (
              <React.Fragment key={date}>
                <li className="week-container">
                  <h1 className="week-title" id={Number(date) + 1}>
                    Semana {Number(date) + 1}
                  </h1>
                  <div className="days-package">
                    {days.map((day) => {
                      if (!data[date][day])
                        return <NoProblems key={day} day={day} />;
                      return (
                        <div key={day} className="day-container">
                          <h4 className="day">{day}</h4>
                          <div className="problem-container">
                            {data[date][day].map((problem) => {
                              counter++;
                              const { tags, name, rating, id, index } = problem;
                              return (
                                <a
                                  target="_blank"
                                  href={`https://codeforces.com/problemset/problem/${id}/${index}`}
                                  className="problem"
                                  key={name}
                                >
                                  <p className="problem-title">{name}</p>
                                  <p
                                    style={dynamicStyleRating(
                                      rating,
                                      data[date].max
                                    )}
                                  >
                                    {rating}
                                  </p>
                                  <div className="tags-container">
                                    {tags.map((tag, idx) => (
                                      <p title={tag} className="tag" key={idx}>
                                        {tag}
                                      </p>
                                    ))}
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <h4>Total de semana: {counter}</h4>
                </li>
                <hr />
              </React.Fragment>
            );
          })}
        </ul>

        <Link className="go-back" to={"/"}>
          Volver
        </Link>
      </main>
    </>
  );
}
