from PIL import Image

# In media_1792833728000_41b3db4b.png:
# 1024 x 225
# There are 4 rows of video cards. Let's inspect height: 225 / 4 is around 56 px per row!
im1 = Image.open(r'C:\Users\kiran\.gemini\antigravity\brain\cdf6416a-5880-4233-b76a-981534d6777c\.user_uploaded\media_1792833728000_41b3db4b.png')
print('Image 1 mode & size:', im1.mode, im1.size)

im2 = Image.open(r'C:\Users\kiran\.gemini\antigravity\brain\cdf6416a-5880-4233-b76a-981534d6777c\.user_uploaded\media_1792833743092_f9306692.png')
print('Image 2 mode & size:', im2.mode, im2.size)
