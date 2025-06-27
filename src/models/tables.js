import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Book = sequelize.define("Book", {
  title: DataTypes.STRING,
  publishedYear: DataTypes.INTEGER,
  pages: DataTypes.INTEGER,
});
const Author = sequelize.define("Author", {
    name: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
});
  Author.hasMany(Book); // author has many books
  Book.belongsTo(Author); // book belongs to author
async function main(){
  // Sync the models with the database
  await sequelize.sync({ force: true });
  await Author.bulkCreate([
      { name: "Ronan The Best", birthYear: 1990 },
      { name: "Kim Ang", birthYear: 1995 },
      { name: "Hok Tim", birthYear: 2015 },
  ]);
  await Book.bulkCreate([
      { title: "The Great Adventure", publishedYear: 2020, pages: 300, AuthorId: 1 },
      { title: "Learning JavaScript", publishedYear: 2021, pages: 250, AuthorId: 2 },
      { title: "Understanding Databases", publishedYear: 2019, pages: 400, AuthorId: 3 },
      { title: "Advanced Node.js", publishedYear: 2022, pages: 350, AuthorId: 1 },
      { title: "Web Development Essentials", publishedYear: 2023, pages: 200, AuthorId: 2 },
      { title: "Full Stack Development", publishedYear: 2024, pages: 450, AuthorId: 3 },
  ]);

}
main();