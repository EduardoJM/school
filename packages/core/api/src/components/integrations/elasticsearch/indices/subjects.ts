export const subjectsCreateIndexData = {
    "settings": {
		"analysis": {
			"filter": {
				"autocomplete_filter": {
					"type": "edge_ngram",
					"min_gram": 1,
					"max_gram": 20
				},
				"br_stop_words": {
					"type": "stop",
					"ignore_case": true,
					"stopwords": [
						"a",
						"ainda",
						"alem",
						"ambas",
						"ambos",
						"antes",
						"ao",
						"aonde",
						"aos",
						"apos",
						"aquele",
						"aqueles",
						"as",
						"assim",
						"com",
						"como",
						"contra",
						"contudo",
						"cuja",
						"cujas",
						"cujo",
						"cujos",
						"da",
						"das",
						"de",
						"dela",
						"dele",
						"deles",
						"demais",
						"depois",
						"desde",
						"desta",
						"deste",
						"dispoe",
						"dispoem",
						"diversa",
						"diversas",
						"diversos",
						"do",
						"dos",
						"durante",
						"e",
						"ela",
						"elas",
						"ele",
						"eles",
						"em",
						"entao",
						"entre",
						"essa",
						"essas",
						"esse",
						"esses",
						"esta",
						"estas",
						"este",
						"estes",
						"ha",
						"isso",
						"isto",
						"logo",
						"mais",
						"mas",
						"mediante",
						"menos",
						"mesma",
						"mesmas",
						"mesmo",
						"mesmos",
						"na",
						"nas",
						"nao",
						"nas",
						"nem",
						"nesse",
						"neste",
						"nos",
						"o",
						"os",
						"ou",
						"outra",
						"outras",
						"outro",
						"outros",
						"pelas",
						"pelas",
						"pelo",
						"pelos",
						"perante",
						"pois",
						"por",
						"porque",
						"portanto",
						"proprio",
						"propios",
						"quais",
						"qual",
						"qualquer",
						"quando",
						"quanto",
						"que",
						"quem",
						"quer",
						"se",
						"seja",
						"sem",
						"sendo",
						"seu",
						"seus",
						"sob",
						"sobre",
						"sua",
						"suas",
						"tal",
						"tambem",
						"teu",
						"teus",
						"toda",
						"todas",
						"todo",
						"todos",
						"tua",
						"tuas",
						"tudo",
						"um",
						"uma",
						"umas",
						"uns"
					]
				}
			},
			"analyzer": {
				"autocomplete": {
					"type": "custom",
					"tokenizer": "standard",
					"filter": [
						"lowercase",
						"asciifolding",
						"br_stop_words",
						"autocomplete_filter"
					]
				}
			}
		}
	},
	"mappings": {
		"properties": {
			"name": {
				"type": "text",
				"analyzer": "autocomplete"
			},
			"active": {
				"type": "boolean"
			},
			"createdAt": {
				"type": "date"
			},
			"icon": {
				"type": "text",
				"fields": {
					"keyword": {
						"type": "keyword",
						"ignore_above": 256
					}
				}
			},
			"id": {
				"type": "long"
			},
			"updatedAt": {
				"type": "date"
			}
		}
	}
};
