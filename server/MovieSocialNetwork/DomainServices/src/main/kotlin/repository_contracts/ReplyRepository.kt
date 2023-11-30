package repository_contracts

import models.Reply
import java.util.UUID

interface ReplyRepository {
  suspend fun createReply(reply: Reply)
  suspend fun updateReply(reply: Reply)
  suspend fun deleteReply(replyId: UUID)
  suspend fun getReplyById(replyId: UUID): Reply?
}
