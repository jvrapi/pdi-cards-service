import 'dotenv/config'

import nock from 'nock'

const apiUrl = process.env.API_URL as string

const sets = {
  object: 'list',
  has_more: false,
  data: [
    {
      object: 'set',
      id: 'c325b3f9-51e1-416b-83b1-138f11790dd1',
      code: 'slp',
      name: 'Secret Lair Showdown',
      uri: 'https://api.scryfall.com/sets/c325b3f9-51e1-416b-83b1-138f11790dd1',
      scryfall_uri: 'https://scryfall.com/sets/slp',
      search_uri:
        'https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Aslp&unique=prints',
      released_at: '2023-02-17',
      set_type: 'promo',
      card_count: 3,
      parent_set_code: 'sld',
      digital: false,
      nonfoil_only: false,
      foil_only: true,
      icon_svg_uri: 'https://svgs.scryfall.io/sets/star.svg?1672030800',
    },
  ],
}

nock(apiUrl).persist().get('/sets').reply(200, sets)
