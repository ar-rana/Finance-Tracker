package pkg

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"io"
	"os"
)

// GetKey returns the encryption key from environment variables.
// In a real app, this should be a 32-byte string for AES-256.
func GetKey() []byte {
	key := os.Getenv("ENCRYPTION_KEY")
	return []byte(key)
}

// Encrypt encrypts plain text string into a base64 encoded string
func Encrypt(plainText string) (string, error) {
	key := GetKey()
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	cipherText := gcm.Seal(nonce, nonce, []byte(plainText), nil)
	return base64.StdEncoding.EncodeToString(cipherText), nil
}

// Decrypt decrypts a base64 encoded cipher text string into plain text
func Decrypt(cryptoText string) (string, error) {
	key := GetKey()
	cipherText, err := base64.StdEncoding.DecodeString(cryptoText)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := gcm.NonceSize()
	if len(cipherText) < nonceSize {
		return "", errors.New("ciphertext too short")
	}

	nonce, cipherText := cipherText[:nonceSize], cipherText[nonceSize:]
	plainText, err := gcm.Open(nil, nonce, cipherText, nil)
	if err != nil {
		return "", err
	}

	return string(plainText), nil
}

// Hash decrypts a base64 encoded cipher text string into plain text
func Hash(plainText string) (string, error) {
	return Encrypt(plainText)
}

// CompareHash compares a plain text string with a crypto text string
func CompareHash(plainText string, cryptoText string) bool {
	decrypted, err := Decrypt(cryptoText)
	if err != nil {
		return false
	}
	return plainText == decrypted
}
