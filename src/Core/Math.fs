module Core.Math

/// Returns a clamped value between the inclusive range of min and max.
let clamp (min: int<_>) (max: int<_>) (value: int<_>) =
    if value < min then min
    else if value > max then max
    else value
