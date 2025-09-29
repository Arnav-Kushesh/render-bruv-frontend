export default function generateRenderInstructions(renderSettings) {
  let blender_settings = {
    engine: renderSettings.engine,
    cycle_device: renderSettings.methodType,
    animation_sequence: getValueForAnimationSequenceField(renderSettings),
  };

  let anime_query = getAnimeQuery(renderSettings);
  let engine_query = getEngineQuery(renderSettings);

  return { blender_settings, anime_query, engine_query };
}

function getAnimeQuery(renderSettings) {
  if (renderSettings.renderType == "ANIMATION") {
    return `-a`;
  }

  if (renderSettings.renderType == "IMAGE") {
    return `-f ${renderSettings.imageFrame}`;
  }

  if (renderSettings.renderType == "RANGE") {
    return `-s ${renderSettings.rangeStart} -e ${renderSettings.rangeEnd} -a`;
  }
}

function getEngineQuery({ methodType, engineType }) {
  if (engineType === "CYCLES") {
    if (methodType) {
      return `-E CYCLES`;
    } else {
      return `-E CYCLES -- --cycles-device ${methodType}`;
    }
  } else if (engineType === "BLENDER_EEVEE_NEXT") {
    return `-E BLENDER_EEVEE_NEXT`;
  } else if (engineType === "BLENDER_WORKBENCH") {
    return `-E BLENDER_WORKBENCH`;
  }
}

function getValueForAnimationSequenceField(renderSettings) {
  if (renderSettings.renderType == "ANIMATION") {
    return {
      entire: true,
    };
  }

  if (renderSettings.renderType == "IMAGE") {
    return {
      single_frame: { status: true, frameValue: renderSettings.imageFrame },
    };
  }

  if (renderSettings.renderType == "RANGE") {
    return {
      range: {
        status: true,
        start_frame: renderSettings.rangeStart,
        end_frame: renderSettings.rangeEnd,
      },
    };
  }
}
