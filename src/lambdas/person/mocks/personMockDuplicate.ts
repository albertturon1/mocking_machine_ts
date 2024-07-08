import { personApiMocks } from "../../../mockingMachine/personApiMocks";

personApiMocks.appendMock({
	"/person/1001/details": {
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
	},
	"/person/1002/details": {
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
	},
});
