import { personApiMocks } from "../../../mockingMachine/personApiMocks";

personApiMocks.appendMock({
	"/person/1000/details": {
		Get: {
			"200": {
				0: {
					budget: 200,
					firstName: "Albert",
					lastName: "Turon",
					car: "Audi",
				},
			},
		},
		Post: {
			"200": {
				0: {
					budget: 200,
					firstName: "Albert",
					lastName: "Turon",
				},
			},
		},
	},
	"/infra": {},
});
