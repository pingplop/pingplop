package repository

// createVerificationToken := "INSERT INTO tokens ( identifier, expires, token ) VALUES ($1, $2, $3)"
// useVerificationToken := "delete from tokens where identifier = $1 and token = $2 RETURNING identifier, expires, token"

// linkAccount := " insert into accounts
//       (
//         "userId",
//         provider,
//         type,
//         "providerAccountId",
//         access_token,
//         expires_at,
//         refresh_token,
//         id_token,
//         scope,
//         session_state,
//         token_type
//       )
//       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//       returning
//         id,
//         "userId",
//         provider,
//         type,
//         "providerAccountId",
//         access_token,
//         expires_at,
//         refresh_token,
//         id_token,
//         scope,
//         session_state,
//         token_type"

// createSession := "insert into sessions ("userId", expires, "sessionToken") values ($1, $2, $3) RETURNING id, "sessionToken", "userId", expires"

// getSessionAndUser := "select * from sessions where "sessionToken" = $1"

// updateSession := " UPDATE sessions set expires = $2 where "sessionToken" = $1"
// deleteSession := " delete from sessions where "sessionToken" = $1"

// unlinkAccount := "delete from accounts where "providerAccountId" = $1 and provider = $2"
// deleteUser := [
//   "delete from users where id = $1",
//   "delete from sessions where "userId" = $1",
//   "delete from accounts where "userId" = $1",
// ]
