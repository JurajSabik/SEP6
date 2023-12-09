package dtos

data class GeneralUserData(
  val numberOfFollowers: Int = 0,
  val numberOfFollowing: Int = 0,
  val numberOfReviews: Int = 0,
  val numberOfLists: Int = 0,
  val numberOfComments: Int = 0,
  val numberOfReplies: Int = 0
)
