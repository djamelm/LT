# Learn Tamazight
![screenshot.png](screenshot.png)

A simple web application to learn the Tamazight language by choosing the correct answer of question.

## Install
If you will use Learn Tamazight:
```sh
$ git clone https://github.com/djamelm/LT
```

## Launch
```sh
$ npm start
```

## Test
```sh
$ npm run test
```

## Build
```sh
$ npm run dist
```

This is a Electron JS(Node JS) application. You need to have the latest version of Node.js.
The app will run on `127.0.0.1:8080` by default.

## feature
## to add

> Apprenez à utiliser un vocabulaire dans le cadre d’une phrase, puis formez vous-même des phrases.

> La prononciation du vocabulaire en bonne qualité.

> modes d'apprentissage, pratique et quiz
: Processus d'apprentissage à 3 niveaux
- Apprendre le vocabulaire au travail ou à la pause (mode d'apprentissage)
- Testez-vous si vous avez complètement mémorisé le vocabulaire. (Mode pratique)
- Jouer à des quiz et gagner des points (mode quiz)

> vocabulaire
- A1 (X)
- A2 (X)
- B1 (X)
- B2 (X)
- C1 (X)
- C2 (X)
- TOEFL (X)
- IELTS (X)
- TOEIC (X)
- SAM (X)
- GMAT (X)
- GRE (X)

> type of phrases et expressions
- pour les débutants (X)
- conversation (X)
- Voyage (X)
- Paroles d'amour (X)
- Dans la vie quotidienne (X)
- Anglais des affaires (X)
- Citations célèbres (X)
- Série dramatique (X)


> Nouveau contenu - pour les débutants (avec photos)
- Nombres, temps
- Animaux, plantes
- nourriture
- relation
- plus

## Resources

The lists of words of the application uses are stored in data.js, which is located on the root of this repository by default.

### Words

This are a JSON-formatted list of words to be on quiz.

```json
{
  "id": "1",
  "name": "word",
  "lang": "en"
}
```
- __id__

  An unique identity.

- __name__

  word written in __lang__.

- __lang__

  The language name in which a word written.
  It must be one of the [IETF language tags](http://unicode.org/cldr/utility/languageid.jsp).


### Phrases

This are a JSON-formatted list of phrases to be on quiz.

```json
{
  "id": "1",
  "phrase": "phrase",
  "lang": "en"
}
```
- __id__

  An unique identity.

- __phrase__

  phrase written in __lang__.

- __lang__

  The language name in which a phrase written.

### sections

This are a JSON-formatted list of sections.

```json
{
  "id": "1",
  "name": "section"
}
```
- __id__

  An unique identity.

- __name__

  name of section.

### sections_words

This are a JSON-formatted list of relation betwin sections and words.

```json
{
  "id": "1",
  "word_id": "1",
  "section_id": "1"
}
```
- __id__

  An unique identity.

- __word_id__

  The identity of [word](#words).

- __section_id__

  The identity of [section](#sections).

### Phrases_words

This are a JSON-formatted list of relation betwin phrases and words.

```json
{
  "id": "1",
  "word_id": "1",
  "phrase_id": "1"
}
```
- __id__

  An unique identity.

- __phrase_id__

  The identity of [phrase](#Phrases).

- __word_id__

  The identity of [word](#words).

### Show some ❤️ and Support!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

MIT License (http://nodaguti.mit-license.org/)