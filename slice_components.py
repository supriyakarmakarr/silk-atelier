import os
from PIL import Image

base_dir = r"c:\Users\SUPRIYA\Desktop\saree\public\assets\extracted"
out_dir = r"c:\Users\SUPRIYA\Desktop\saree\public\assets\crops"
os.makedirs(out_dir, exist_ok=True)

# 1. Page 1: Hero background without top navbar or with full showroom
hero = Image.open(os.path.join(base_dir, "p1_img1_4.jpeg"))
hero.save(os.path.join(out_dir, "hero_full.jpg"), quality=95)

# 2. Page 2: Six Moods arches
# Size is 1240 x 436. Let's see the arch positions
p2 = Image.open(os.path.join(base_dir, "p2_img1_7.jpeg"))
# Arches are roughly from y=170 to y=390, spread across x=130 to x=1110
# Let's crop individual arches
w, h = p2.size
arch_names = ["wedding_edit", "kanchipuram_icons", "banarasi_heirlooms", "festive_radiance", "zari_signatures", "bridal_elan"]
# The 6 arches span from ~x=130 to ~x=1110, spacing ~160px
arch_xs = [
    (145, 275),
    (300, 430),
    (455, 585),
    (610, 740),
    (765, 895),
    (920, 1050)
]
for i, (x1, x2) in enumerate(arch_xs):
    # arch height from approx y=175 to y=395
    arch = p2.crop((x1, 175, x2, 395))
    arch.save(os.path.join(out_dir, f"mood_{arch_names[i]}.jpg"), quality=95)

# 3. Page 3: Try the Look
p3 = Image.open(os.path.join(base_dir, "p3_img1_10.jpeg"))
# Left side models stage: x=0 to x=920
# Right side product panel: x=920 to x=1240
stage = p3.crop((0, 0, 930, h))
stage.save(os.path.join(out_dir, "try_look_stage.jpg"), quality=95)
panel = p3.crop((925, 140, 1230, 485))
panel.save(os.path.join(out_dir, "try_look_panel.jpg"), quality=95)

# Individual models from Try the Look stage
models_xs = [
    ("model_purple_left", 0, 130),
    ("model_green_1", 115, 275),
    ("model_ivory_center", 280, 440),
    ("model_mustard_orange", 470, 630),
    ("model_maroon_back", 620, 740),
    ("model_blue_back", 720, 840)
]
for name, x1, x2 in models_xs:
    m = p3.crop((x1, 160, x2, 470))
    m.save(os.path.join(out_dir, f"try_{name}.png"))

# 4. Page 4: Pick a Silk cards
p4 = Image.open(os.path.join(base_dir, "p4_img1_13.jpeg"))
# Cards: Orange, Magenta Sho Silk, Palace Check, Bengal Garden, Kanchi Rani, Benares Gold, Kanchi Checks
card_xs = [
    ("orange_silk", 0, 110),
    ("magenta_sho_silk", 80, 275),
    ("palace_check", 240, 435),
    ("bengal_garden", 400, 600),
    ("kanchi_rani", 570, 775),
    ("benares_gold", 740, 940),
    ("kanchi_checks", 900, 1100),
    ("teal_silk", 1060, 1240)
]
for name, x1, x2 in card_xs:
    c = p4.crop((x1, 150, x2, 490))
    c.save(os.path.join(out_dir, f"pick_{name}.png"))

# 5. Page 5: The Rack
p5 = Image.open(os.path.join(base_dir, "p5_img1_16.jpeg"))
# Saree hangers hanging from rod
hangers = [
    ("saree_checked_magenta", 140, 240),
    ("saree_royal_blue", 200, 300),
    ("saree_ivory_cream", 260, 360),
    ("saree_bronze_check", 320, 420),
    ("saree_rani_pink", 380, 480),
    ("saree_temple_gold_center", 495, 635),
    ("saree_mustard_check", 645, 745),
    ("saree_peacock_blue", 710, 810),
    ("saree_magenta_green_border", 775, 875)
]
for name, x1, x2 in hangers:
    h_img = p5.crop((x1, 200, x2, 470))
    h_img.save(os.path.join(out_dir, f"rack_{name}.png"))

# 6. Page 6 & 7: Rack Detail
p6 = Image.open(os.path.join(base_dir, "p6_img1_19.jpeg"))
# Center gold hanger
center_gold_saree = p6.crop((530, 180, 710, 390))
center_gold_saree.save(os.path.join(out_dir, "rack_detail_gold_saree.png"))

p7 = Image.open(os.path.join(base_dir, "p7_img1_22.jpeg"))
# Center saffron blouse
center_saffron_blouse = p7.crop((470, 180, 770, 390))
center_saffron_blouse.save(os.path.join(out_dir, "rack_detail_saffron_blouse.png"))

# 7. Page 8: Muse Film
p8 = Image.open(os.path.join(base_dir, "p8_img1_25.jpeg"))
film_center = p8.crop((315, 175, 925, 470))
film_center.save(os.path.join(out_dir, "muse_film_center.jpg"), quality=95)
# Left 3 photos
film_left_1 = p8.crop((55, 160, 215, 255))
film_left_2 = p8.crop((55, 265, 215, 390))
film_left_3 = p8.crop((55, 400, 215, 490))
film_left_1.save(os.path.join(out_dir, "muse_left_1.jpg"), quality=95)
film_left_2.save(os.path.join(out_dir, "muse_left_2.jpg"), quality=95)
film_left_3.save(os.path.join(out_dir, "muse_left_3.jpg"), quality=95)
# Right 3 photos
film_right_1 = p8.crop((1020, 160, 1180, 245))
film_right_2 = p8.crop((1020, 250, 1180, 385))
film_right_3 = p8.crop((1020, 390, 1180, 490))
film_right_1.save(os.path.join(out_dir, "muse_right_1.jpg"), quality=95)
film_right_2.save(os.path.join(out_dir, "muse_right_2.jpg"), quality=95)
film_right_3.save(os.path.join(out_dir, "muse_right_3.jpg"), quality=95)

# 8. Page 9: Muse Reels
p9 = Image.open(os.path.join(base_dir, "p9_img1_28.jpeg"))
# Reels
reel_center = p9.crop((475, 215, 630, 455))
reel_center.save(os.path.join(out_dir, "reel_pachai_pattu.jpg"), quality=95)
reel_sindoor = p9.crop((650, 215, 805, 455))
reel_sindoor.save(os.path.join(out_dir, "reel_galli_sindoor.jpg"), quality=95)
reel_banarasi = p9.crop((325, 220, 460, 455))
reel_banarasi.save(os.path.join(out_dir, "reel_kaali_banarasi.jpg"), quality=95)
reel_ponni = p9.crop((820, 225, 935, 455))
reel_ponni.save(os.path.join(out_dir, "reel_ponni_kanjivaram.jpg"), quality=95)
reel_marina = p9.crop((215, 235, 310, 455))
reel_marina.save(os.path.join(out_dir, "reel_marina_morning.jpg"), quality=95)

# 9. Page 10: Bridal Collection
p10 = Image.open(os.path.join(base_dir, "p10_img1_31.jpeg"))
# Center bridal card: Manjal Kalyanam Pattu
bridal_center = p10.crop((480, 190, 725, 435))
bridal_center.save(os.path.join(out_dir, "bridal_manjal_kalyanam.jpg"), quality=95)
bridal_left_pink = p10.crop((315, 205, 480, 435))
bridal_left_pink.save(os.path.join(out_dir, "bridal_left_pink.jpg"), quality=95)
bridal_right_green = p10.crop((725, 205, 875, 435))
bridal_right_green.save(os.path.join(out_dir, "bridal_right_green.jpg"), quality=95)
bridal_far_left_red = p10.crop((165, 220, 315, 435))
bridal_far_left_red.save(os.path.join(out_dir, "bridal_far_left_red.jpg"), quality=95)
bridal_far_right_gold = p10.crop((880, 220, 1040, 435))
bridal_far_right_gold.save(os.path.join(out_dir, "bridal_far_right_gold.jpg"), quality=95)

print("All section crops generated successfully!")
