import { describe, it, expect, vi } from "vitest";
import {
  checkIfCocktailAlreadyExist,
  checkIfCocktailHaveAnImage,
  getListOfIngredients,
  getRandomCocktailFromApi,
  getRandomCocktails,
} from "@/shared/services/cocktailDb";

import fakeData from "@/shared/services/__test__/fixtureFakeData.json";

const lstCocktails = [
  {
    idDrink: "1",
    strDrink: "Test",
    lock: false,
  },
  {
    idDrink: "2",
    strDrink: "Test2",
    strDrinkThumb: "ImageTest2",
    lock: false,
  },
  {
    idDrink: "3",
    strDrink: "Test3",
    strDrinkThumb: "ImageTest3",
    lock: false,
    strIngredient1: "Ingredient1",
    strIngredient2: "Ingredient1",
    strIngredient3: "Ingredient1",
  },
  {
    idDrink: "4",
    strDrink: "Test4",
    strDrinkThumb: "ImageTest4",
    lock: false,
    strIngredient1: "Ingredient1",
  },
  {
    idDrink: "5",
    strDrink: "Test5",
    strDrinkThumb: "ImageTest5",
    lock: false,
  },
];

describe("IfCocktailAlreadyExist", () => {
  it("TestIfCocktailAlreadyExist, cocktail already exist", () => {
    expect(checkIfCocktailAlreadyExist("1", lstCocktails)).toBe(true);
  });

  it("IfCocktailAlreadyExist, cocktail not already exist", () => {
    expect(checkIfCocktailAlreadyExist("10", lstCocktails)).toBe(false);
  });
});

describe("IfCocktailHaveAnImage", () => {
  it("TestIfCocktailAlreadyExist, cocktail have not an image", () => {
    expect(checkIfCocktailHaveAnImage(lstCocktails[0])).toBe(false);
  });

  it("TestIfCocktailAlreadyExist, cocktail have an image", () => {
    expect(checkIfCocktailHaveAnImage(lstCocktails[1])).toBe(true);
  });
});

describe("GetListOfIngredient", () => {
  it("TestIfCocktailAlreadyExist, cocktail have 3 ingredients", () => {
    expect(getListOfIngredients(lstCocktails[2])).toHaveLength(3);
  });
  it("TestIfCocktailAlreadyExist, cocktail have only 1 ingredient", () => {
    expect(getListOfIngredients(lstCocktails[3])).toHaveLength(1);
  });
  it("TestIfCocktailAlreadyExist, cocktail have not ingredient", () => {
    expect(getListOfIngredients(lstCocktails[4])).toHaveLength(0);
  });
});

describe("getRandomCocktailFromApi", () => {
  it("getRandomCocktailFromApi, throw error", async () => {
    vi.stubGlobal("fetch", () => {
      throw new Error();
    });
    expect(await getRandomCocktailFromApi()).toBeNull();
  });

  it("getRandomCocktailFromApi, get one cocktail", async () => {
    vi.stubGlobal("fetch", async () => {
      return {
        idDrink: "1",
      };
    });
    expect(await getRandomCocktailFromApi()).toEqual({
      idDrink: "1",
    });
  });
});

describe("getRandomCocktails", () => {
  it("getRandomCocktails, get one cocktail", async () => {
    vi.stubGlobal("fetch", async () => {
      return { ok: true, json: async () => fakeData };
    });
    expect(await getRandomCocktails(1)).toEqual([
      { ...fakeData.drinks[0], lock: false },
    ]);
  });
});
