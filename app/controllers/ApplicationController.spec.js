const ApplicationController = require("./ApplicationController");

describe("ApplicationController", () => {
  describe("#handleGetRoot", () => {
    it("should call res.status(200) and res.json with status and message", () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const applicationController = new ApplicationController();
      applicationController.handleGetRoot(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "BCR API is up and running!",
      });
    });
  });

  describe("#handleNotFound", () => {
    it("Should return a status code of 404 and json response", () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const applicationController = new ApplicationController();
      const request = {};

      applicationController.handleNotFound(Request, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({
        error: {
          name: "Error",
          message: "Not found!",
          details: { method: undefined, url: undefined },
        },
      });
    });
  });

  describe("#handleError", () => {
    it("should call res.status(500) and res.json with error message and details", () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = {
        name: "errors",
        message: "errors",
        details: "details error",
      };

      const applicationController = new ApplicationController();
      const request = {};

      applicationController.handleError(err, request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details,
        },
      });
    });
  });

  describe("#getOffsetFromRequest", () => {
    it("should return offset", () => {
      const mockRequest = {
        query: {
          page: 2,
          pageSize: 10,
        },
      };

      const applicationController = new ApplicationController();
      const offset = applicationController.getOffsetFromRequest(mockRequest);

      expect(offset).toEqual(10);
    });
  });

  describe("#buildPaginationObject", () => {
    it("should return page, pageCount, pageSize, and count", () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10
        }
      };

      const mockCount = 20;

      const applicationController = new ApplicationController();

      const result = applicationController.buildPaginationObject(mockRequest, mockCount)

      expect(result).toEqual({
        page: 1,
        pageCount: 2,
        pageSize: 10,
        count: 20
      })
    });
  });
});
