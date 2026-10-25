from PIL import Image

im1 = Image.open(r'C:\Users\kiran\.gemini\antigravity\brain\cdf6416a-5880-4233-b76a-981534d6777c\.user_uploaded\media_1792833728000_41b3db4b.png')
# Let's crop individual tiles from Row 1
# Width is 1024. How many tiles in row 1?
# Let's crop x from 0 to 80, y from 0 to 56
# Let's see how many tiles:
# Let's crop top left tile and save as debug_tile1.png
tile = im1.crop((0, 0, 75, 56))
tile.save('debug_tile1.png')
print('Saved debug_tile1.png')
