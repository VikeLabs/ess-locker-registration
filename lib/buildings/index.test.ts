import { createBuilding, deleteBuildingById, getBuildings } from ".";

describe("building service", () => {
  describe("createBuilding", () => {
    it("creates a building", () => {
      const id = createBuilding("test building");
      expect(id).toBe(1);
    });

    describe("when the building already exists", () => {
      it("throws an error", () => {
        expect(() => createBuilding("test building")).toThrow();
      });
    });
  });

  describe("getBuildings", () => {
    it("gets all buildings", () => {
      const buildings = getBuildings();
      expect(buildings).toHaveLength(1);
    });
  });

  describe("deleteBuildingById", () => {
    it("deletes a building", () => {
      deleteBuildingById(1);
      const buildings = getBuildings();
      expect(buildings).toHaveLength(0);
    });
  });
});
