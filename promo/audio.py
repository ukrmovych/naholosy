# Фонова музика (легкий lo-fi/поп, 100 BPM) + звуки натискань/переходів → audio.wav
import numpy as np, json, wave, os
W = os.path.dirname(os.path.abspath(__file__)) + ('/work/m/' if os.environ.get('PROMO') == 'm' else '/work/v/')
SR = 44100; DUR = float(open(W + 'duration.txt').read()); N = int(SR * DUR)
rng = np.random.default_rng(7)
def t_(d): return np.arange(int(SR * d)) / SR
def add(buf, x, at, g=1.0):
    i = int(at * SR); x = x[:max(0, len(buf) - i)]; buf[i:i + len(x)] += x * g
def env(n, a, d):  # атака + експоненційне згасання
    t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / d)
def midi(m): return 440 * 2 ** ((m - 69) / 12)
def lowpass(x, a):  # простий однополюсний фільтр
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y

music = np.zeros(N)
BPM = 100; beat = 60 / BPM; bar = beat * 4
# Cmaj7 – Am7 – Fmaj7 – G6
chords = [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 64]]
roots = [36, 33, 29, 31]
def pad(notes, d):
    t = t_(d); x = sum(np.sin(2 * np.pi * midi(m) * t * (1 + det)) for m in notes for det in (-.002, .002))
    e = np.minimum(1, t / .6) * np.minimum(1, (d - t) / .6); return x * e / (len(notes) * 2)
def pluck(m, d=.9):
    t = t_(d); f = midi(m)
    x = np.sin(2 * np.pi * f * t) + .35 * np.sin(4 * np.pi * f * t) * np.exp(-t / .08) + .15 * np.sin(6 * np.pi * f * t) * np.exp(-t / .04)
    return x * env(len(t), .004, .25)
def bass(m, d):
    t = t_(d); return (np.sin(2 * np.pi * midi(m) * t) + .2 * np.sin(4 * np.pi * midi(m) * t)) * env(len(t), .01, .5) * np.minimum(1, (d - t) / .05)
def kick():
    t = t_(.35); f = 50 + 70 * np.exp(-t / .04); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .12)
def hat():
    x = rng.standard_normal(int(SR * .05)); x = x - lowpass(x, .5); return x * env(len(x), .001, .015)
def snap():
    x = rng.standard_normal(int(SR * .18)); x = lowpass(x, .35) - lowpass(x, .05); return x * env(len(x), .002, .05)
arp_pat = [0, 1, 2, 3, 2, 1, 2, 3]
nbars = int(DUR / bar) + 1
for b in range(nbars):
    t0 = b * bar; c = chords[b % 4]
    add(music, pad([n - 12 for n in c[:3]] + [c[3]], bar + .3), t0, .35)
    add(music, bass(roots[b % 4], beat * 1.8), t0, .45); add(music, bass(roots[b % 4] + 7, beat * 1.5), t0 + beat * 2.5, .3)
    if b >= 1:
        for i in range(8): add(music, pluck(c[arp_pat[i]] + 12, .6), t0 + i * beat / 2, .16 if i % 2 else .22)
    if b >= 2:
        for i in range(4): add(music, kick(), t0 + i * beat, .55 if i % 2 == 0 else .25)
        for i in range(8): add(music, hat(), t0 + i * beat / 2 + (beat / 2 * .08 if i % 2 else 0), .04 if i % 2 else .06)
        for i in (1, 3): add(music, snap(), t0 + i * beat, .22)
# фінальний акорд — разом із «тада»
EV = json.load(open(W + 'events.json'))
add(music, pad([48, 55, 60, 64, 67], 4), next((e['t'] for e in EV if e['type'] == 'tada'), 31.7), .5)
tt = np.arange(N) / SR
fade = np.minimum(1, tt / 1.0) * np.clip((DUR - tt) / 2.2, 0, 1)
music *= fade
music = music / np.abs(music).max() * .32

sfx = np.zeros(N)
def tap():
    t = t_(.09); f = 1500 * np.exp(-t / .02) + 600
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), .001, .018)
    n = rng.standard_normal(len(t)) * env(len(t), .0005, .004) * .4
    return x + n
def key():
    t = t_(.05); f = rng.uniform(1800, 2400)
    return (np.sin(2 * np.pi * f * t) * .5 + rng.standard_normal(len(t)) * .5) * env(len(t), .0005, .008)
def whoosh(d=.5):
    x = rng.standard_normal(int(SR * d)); t = np.arange(len(x)) / SR
    a = .01 + .12 * np.sin(np.pi * t / d) ** 2
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a[i] * (x[i] - acc); y[i] = acc
    return y * np.sin(np.pi * t / d) ** 1.5
def chime():
    out = np.zeros(int(SR * 1.2))
    for j, m in enumerate([84, 88, 91, 96]):
        t = t_(1.2 - j * .07); x = (np.sin(2 * np.pi * midi(m) * t) + .3 * np.sin(2 * np.pi * midi(m) * 2.76 * t) * np.exp(-t / .1)) * env(len(t), .002, .3)
        out[int(j * .07 * SR):int(j * .07 * SR) + len(x)] += x
    return out * .5
def pop():
    t = t_(.15); f = 400 + 900 * (t / .15); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), .002, .04)
def soft():
    t = t_(.3); return np.sin(2 * np.pi * midi(79) * t) * env(len(t), .01, .08) * .5 + np.sin(2 * np.pi * midi(86) * t) * env(len(t), .01, .06) * .3
def tada():
    out = np.zeros(int(SR * 1.8))
    for j, m in enumerate([72, 76, 79, 84]):
        x = pluck(m, 1.4); out[int(j * .09 * SR):int(j * .09 * SR) + len(x)] += x
    return out * .6
def cap():
    t = t_(.12); f = 700 + 500 * (t / .12); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), .003, .03)
def rise(d=4.6):  # «перемотка»: шум, що наростає вгору
    x = rng.standard_normal(int(SR * d)); t = np.arange(len(x)) / SR
    a = .02 + .3 * (t / d) ** 2
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a[i] * (x[i] - acc); y[i] = acc
    y = y - lowpass(y, .02)
    return y * np.minimum(1, t / .3) * np.minimum(1, (d - t) / .25) * (.4 + .6 * t / d)
S = {'tick': (tap() * .6, .35), 'rise': (rise(), .5), 'tap': (tap(), .55), 'key': (None, .25), 'whoosh': (whoosh(), .14), 'soft': (soft(), .35), 'chime': (chime(), .35),
     'pop': (pop(), .45), 'tada': (tada(), .5), 'cap': (cap(), .12)}
for e in EV:
    x, g = S[e['type']]
    if e['type'] == 'key': x = key()
    if e['type'] == 'whoosh': add(sfx, x, e['t'] - .2, g)
    else: add(sfx, x, e['t'], g)
mix = music + sfx
mix = np.tanh(mix * 1.2) / np.tanh(1.2) * .85
st = np.stack([mix, mix], 1)
with wave.open(W + 'audio.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype('<i2').tobytes())
print('ok', np.abs(music).max(), np.abs(sfx).max())
