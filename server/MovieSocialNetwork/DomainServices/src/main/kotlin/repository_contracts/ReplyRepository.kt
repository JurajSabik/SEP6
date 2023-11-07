package repository_contracts

import models.Reply
import java.util.UUID

interface ReplyRepository {
  fun createReply(reply: Reply)
  fun updateReply(reply: Reply)
  fun deleteReply(replyId: UUID)
  fun getReplyById(replyId: UUID): Reply?
}
