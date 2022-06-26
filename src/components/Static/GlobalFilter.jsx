import React from "react";
import "./Statistical.scss";
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div class="form__group field">
      <input
        type="input"
        class="form__field"
        name="name"
        id="name"
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
      <label for="name" class="form__label">
        Search
      </label>
    </div>
  );
};
