import { InMemoryChallengesRepository } from "../../../tests/repositories/in-memory-challenges-repository"
import { InMemoryStudentsRepository } from "../../../tests/repositories/in-memory-students-repository"
import { Challenge } from "../../domain/entities/challenge"
import { Student } from "../../domain/entities/student"
import { CreateChallengeSubmission } from "./create-challenge-submission"

describe("Create challenge submission use case", () => {
  it("should be able to create a new challenge submission", async () => {
    const studentsRepository = new InMemoryStudentsRepository()
    const challengesRepository = new InMemoryChallengesRepository()

    const student = Student.create({
      name: "Alex",
      email: "uthus@example.com"
    })

    const challenge = Challenge.create({
      title: "Challenge 01",
      instructionsUrl: "http://example.com"
    })

    studentsRepository.items.push(student)
    challengesRepository.items.push(challenge)

    const createChallengeSubmission = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    )

    const response = await createChallengeSubmission.execute({
      studentId: student.id,
      challengeId: challenge.id
    })

    expect(response).toBeTruthy()
  })
})
