import { personApiMocks } from "../../../mockingMachine/personApiMocks";

personApiMocks.appendMock({
	"/person/1000/details": {
		Get: {
			"200": {
				0: {
					budget: 200,
					firstName: "A",
					lastName: "T",
					car: "Audi",
				},
			},
		},
		Post: {
			"200": {
				0: {
					budget: 200,
					firstName: "A",
					lastName: "T",
				},
			},
		},
	},
	"/infra": {},
});
