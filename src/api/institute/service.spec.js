const service = require("./service");
const Boom = require("@hapi/boom");
const { Institute, Submission } = require("../../store/mongo");

jest.mock("@hapi/boom");

jest.mock("../../store/mongo", () => ({
  Institute: {
    find: jest.fn(),
    lean: jest.fn(),
    create: jest.fn(),
  },
  Submission: {
    find: jest.fn(),
    lean: jest.fn(),
    create: jest.fn(),
    limit: jest.fn(),
    toObject: jest.fn(),
  },
}));

const institutions = [{ id: "kevin", __v: 1 }];
const submissionsArray = [
  { blah: "blah", institution_id: "kevin" },
  { blah: "blah", institution_id: "bacon" },
];

const models = {
    Institute,
    Submission,
};

describe("validateInstituteId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("does not throw error if id exists", async () => {
    Institute.find.mockImplementationOnce(() => Promise.resolve([1]));
    await service.validateInstituteId(Institute, "blah");
    expect(Boom.badData).not.toHaveBeenCalled();
  });
  test("will throw error if id exists", async () => {
    Institute.find.mockImplementationOnce(() => Promise.resolve([]));
    try {
      await service.validateInstituteId(Institute, "blah");
    } catch (err) {
      expect(err).toBe();
    }
  });
  test("does not throw error if body.id does not exist", async () => {
    Submission.find.mockImplementationOnce(() => Promise.resolve([]));
    await service.validateInstituteId(Submission, null, { id: "Kevin" });
    expect(Boom.badData).not.toHaveBeenCalled();
  });
  test("will throw error if id exists", async () => {
    Submission.find.mockImplementationOnce(() => Promise.resolve([1]));
    try {
      await service.validateInstituteId(Submission, null, { id: "Kevin" });
    } catch (err) {
      expect(err).toBe();
    }
  });
});

describe("joinLatestSubmissionData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("returns consolidated data", async () => {
    Submission.find.mockImplementationOnce(() => [Submission]);
    Submission.toObject.mockImplementationOnce(() => submissionsArray);

    expect(
      await service.joinLatestSubmissionData(institutions, Submission)
    ).toEqual([
      {
        id: "kevin",
        latestSubmission: {
          0: {
            blah: "blah",
            institution_id: "kevin",
          },
          1: {
            blah: "blah",
            institution_id: "bacon",
          },
        },
      },
    ]);
  });
});

describe("getInstituteData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



  test("data is returned if complete is true", async () => {
    Institute.find.mockImplementationOnce(() => Promise.resolve(institutions));
    Submission.find.mockImplementationOnce(() => [Submission]);
    Submission.toObject.mockImplementationOnce(() => submissionsArray);

    expect(await service.getInstituteData(models, "true", {})).toEqual([
      {
        id: "kevin",
        latestSubmission: {
          0: { blah: "blah", institution_id: "kevin" },
          1: { blah: "blah", institution_id: "bacon" },
        },
      },
    ]);
  });
  test("data is returned if complete is null", async () => {
    Institute.find.mockImplementationOnce(() => Promise.resolve(institutions));
    Submission.find.mockImplementationOnce(() => [Submission]);
    Submission.toObject.mockImplementationOnce(() => submissionsArray);

    expect(await service.getInstituteData(models, null, {})).toEqual([
      {
        id: "kevin",
        __v: 1
      }
    ]);
  });
  test("error is thrown if it cannot get the data", async () => {
    Institute.find.mockImplementationOnce(() => Promise.reject(Error('whoopsie')));
    try {
        await service.getInstituteData(models, null, {})
    } catch (err) {
        expect(err).toBe()
    }
  });
});

describe('addInstituteData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
    test('adds institute document for institute if no id is present', async () => {
        Institute.create.mockImplementationOnce(() => Promise.resolve(true))
        await service.addInstituteData(models, { Kevin: 'Bacon' })
        expect(Boom.badData).not.toHaveBeenCalled();
    })
    test('adds submission document for institute if institute id is present', async () => {
        Institute.find.mockImplementationOnce(() => Promise.resolve([1]));
        Institute.create.mockImplementationOnce(() => Promise.resolve(true))
        Submission.create.mockImplementationOnce(() => Promise.resolve(true))
        await service.addInstituteData(models, { Kevin: 'Bacon' }, 'blah')
        expect(Boom.badData).not.toHaveBeenCalled();
    })
    test("error is thrown if it cannot add the data", async () => {
        Institute.find.mockImplementationOnce(() => Promise.reject(Error('whoopsie')));
        try {
            await service.addInstituteData(models, null, {})
        } catch (err) {
            expect(err).toBe()
        }
      });
})
