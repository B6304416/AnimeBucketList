import { User } from "./models/userModel.js";
import { Genre } from "./models/genreModel.js"
import { Suggestion } from "./models/suggestionModel.js"
import { Character } from "./models/characterModel.js"

import { AnimeReview } from "./models/animeReviewModel.js";
import { Anime, AnimeStudio, AnimeType, AnimeSource } from "./models/animeModel.js";

import { MangaReview } from "./models/mangaReviewModel.js"
import { Manga, Author } from "./models/mangaModel.js"

import { Book } from "./models/bookModel.js"
import bcrypt from "bcryptjs"

async function setupDatabase() {
    //User
    const hashedPassword = await bcrypt.hash('1234', 10);
    const newUser1 = {
        name: "Kanakan Hahaha",
        email: "kkk@gmail.com",
        password: hashedPassword,
        role: 1,
    }
    const newUser2 = {
        name: "Konoha Manama",
        email: "ooo@gmail.com",
        password: hashedPassword,
        role: 2,
    }
    const user1 = await User.create(newUser1);
    const user2 = await User.create(newUser2);

    //Genre
    const newGenre1 = { name: "Action", }
    const newGenre2 = { name: "Adventure", }
    const newGenre3 = { name: "Drama", }
    await Genre.create(newGenre1);
    await Genre.create(newGenre2);
    await Genre.create(newGenre3);

    //Suggestion
    const newSuggestion1 = { detail: "เพิ่มนั้นนู้นนี้หน่อยครับ", userId: user2._id }
    const newSuggestion2 = { detail: "ไม่มีไรครับ", userId: user2._id }
    await Suggestion.create(newSuggestion1);
    await Suggestion.create(newSuggestion2);

    //Anime
    const newAnimeStudio1 = {
        name: "Madhouse",
    }
    const newAnimeStudio2 = {
        name: "Bones",
    }
    const studio1 = await AnimeStudio.create(newAnimeStudio1);
    const studio2 = await AnimeStudio.create(newAnimeStudio2);
    const newAnimeType1 = {
        name: "TV serie",
    }
    const newAnimeType2 = {
        name: "Movie",
    }
    const type1 = await AnimeType.create(newAnimeType1);
    const type2 = await AnimeType.create(newAnimeType2);
    const newAnimeSource1 = {
        name: "Manga",
    }
    const newAnimeSource2 = {
        name: "Light Novel",
    }
    const newAnimeSource3 = {
        name: "Original",
    }
    const source1 = await AnimeSource.create(newAnimeSource1);
    const source2 = await AnimeSource.create(newAnimeSource2);
    const source3 = await AnimeSource.create(newAnimeSource3);

    const newAnime1 = {
        name: "Hunter x Hunter",
        typeId: type1._id,
        studioId: studio1._id,
        sourceId: source1._id,
        episode: 124,
        genre: "Action, Adventure",
        imgUrl: "https://media.gq-magazin.de/photos/628e35d2be670efaab242579/16:9/w_2560%2Cc_limit/HunterxHunter-Aufmacher.jpg"
    }
    const newAnime2 = {
        name: "Oshi no Ko",
        typeId: type1._id,
        studioId: studio2._id,
        sourceId: source2._id,
        episode: 11,
        genre: "Drama",
        imgUrl: "https://sm.ign.com/ign_in/screenshot/default/oshi-ni-ko_1gvm.jpg"
    }
    const anime1 = await Anime.create(newAnime1);
    const anime2 = await Anime.create(newAnime2);

    //Anime Review
    const newAnimeReview1 = {
        comment: "เรื่องนี้ไม่หนุก",
        rate: 2,
        userId: user1._id,
        animeId: anime1._id,
    }
    const newAnimeReview2 = {
        comment: "หนุกดี",
        rate: 5,
        userId: user2._id,
        animeId: anime1._id,
    }
    const newAnimeReview3 = {
        comment: "ฮ่าฮ่าฮ๋า",
        rate: 3,
        userId: user1._id,
        animeId: anime2._id,
    }
    const newAnimeReview4 = {
        comment: "เบื่อ",
        rate: 1,
        userId: user2._id,
        animeId: anime2._id,
    }
    await AnimeReview.create(newAnimeReview1);
    await AnimeReview.create(newAnimeReview2);
    await AnimeReview.create(newAnimeReview3);
    await AnimeReview.create(newAnimeReview4);

    //Manga
    const newAuthor1 = {
        eng_name: "Asano Inio",
    }
    const newAuthor2 = {
        eng_name: "Miura Kentarou",
    }
    const author1 = await Author.create(newAuthor1);
    const author2 = await Author.create(newAuthor2);

    const newManga1 = {
        name: "Oyasumi Punpun",
        authorId: author1._id,
        genre: 'Drama',
        imgUrl: "https://www.theanimex.com/wp-content/uploads/2021/12/Goodnight-Punpun-Vol.-5-1071x1536.jpg.webp"
    }
    const newManga2 = {
        name: "Berserk",
        authorId: author2._id,
        genre: 'Action',
        imgUrl: "https://comicvine.gamespot.com/a/uploads/scale_small/11156/111567728/8724269-berserkv41%282022%29.jpg"
    }
    const manga1 = await Manga.create(newManga1);
    const manga2 = await Manga.create(newManga2);

    //Manga Review
    const newMangaReview1 = {
        comment: "เรื่องนี้ไม่หนุกโย่ว",
        rate: 2,
        userId: user1._id,
        mangaId: manga1._id,
    }
    const newMangaReview2 = {
        comment: "โย่วหนุกดี",
        rate: 5,
        userId: user1._id,
        mangaId: manga2._id,
    }
    const newMangaReview3 = {
        comment: "ฮ่าฮ่าหกฮ๋า",
        rate: 3,
        userId: user2._id,
        mangaId: manga1._id,
    }
    const newMangaReview4 = {
        comment: "ไม่รู้จะคอมเมนไรดีเลย",
        rate: 4,
        userId: user2._id,
        mangaId: manga2._id,
    }
    await MangaReview.create(newMangaReview1);
    await MangaReview.create(newMangaReview2);
    await MangaReview.create(newMangaReview3);
    await MangaReview.create(newMangaReview4);


    //Character
    const newCharacter1 = {
        name: "Zoldyck Killua",
        score: 0,
        animeId: anime1._id,
        mangaId: null,
        imgUrl: "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMzUxODQzNC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTcxMzA0MDExN30.jxes-ujTVEw9EDWdFCXOaYz9ABsSrwKZsd0qZR58GWk/img.jpg?width=800&quality=80"
    }
    const newCharacter2 = {
        name: "Griffith",
        score: 0,
        animeId: null,
        mangaId: manga2,
        imgUrl: "https://w.forfun.com/fetch/03/03a15727edfb426ab3c78cb63b613844.jpeg"
    }
    await Character.create(newCharacter1);
    await Character.create(newCharacter2);

    //Book
    const newBook1 = {
        title: "Why we sleep",
        author: 'Matthew Walker',
        publishYear: 2017,
    }
    const newBook2 = {
        title: "คินดะอิจิยอดนักสืบ ร่างทรงมรณะ",
        author: 'Seishi Yokomizo',
        publishYear: 1976,
    }
    await Book.create(newBook1);
    await Book.create(newBook2);
}

export { setupDatabase };