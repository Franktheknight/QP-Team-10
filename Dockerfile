# docker pull tensorflow/serving
FROM tensorflow/serving

#sudo docker run -p 8501:8501 --mount type=bind,source=/home/boopala/infer_emotion,target=/models/infer_emotion/1 -e MODEL_NAME=infer_emotion -t tensorflow/serving &

# Set where models should be stored in the container
# target=/models/half_plus_two \
ENV MODEL_BASE_PATH=/models/infer_emotion
RUN mkdir -p ${MODEL_BASE_PATH}
#WORKDIR  ${MODEL_BASE_PATH}


# The only required piece is the model name in order to differentiate endpoints
# -e MODEL_NAME=half_plus_two
ENV MODEL_NAME=infer_emotion

# source=/tmp/tfserving/serving/tensorflow_serving/servables/tensorflow/testdata/saved_model_half_plus_two_cpu,\
# relative path; looking for a models folder within build context
COPY /infer_emotion ${MODEL_BASE_PATH}/1/

# Create a script that runs the model server so we can use environment variables
# while also passing in arguments from the docker command line

# $PORT is set by Heroku
# this command writes up a script within echo '', then writes it to provided file; then runs chmod			
RUN echo '#!/bin/bash \n\n\
tensorflow_model_server  --rest_api_port=$PORT \
--model_name=${MODEL_NAME} --model_base_path=${MODEL_BASE_PATH} \
"$@"' > /usr/bin/tf_serving_entrypoint.sh \
&& chmod +x /usr/bin/tf_serving_entrypoint.sh
# CMD is required to run on Heroku
CMD ["/usr/bin/tf_serving_entrypoint.sh"]

# provides a new shell script from local directory to container; should do the same thing as above...
# COPY tf_serving_entrypoint.sh /usr/bin/tf_serving_entrypoint.sh
# RUN chmod +x /usr/bin/tf_serving_entrypoint.sh
# ENTRYPOINT []
# CMD ["/usr/bin/tf_serving_entrypoint.sh"]
# new shell script copied before
# !/bin/bash
#
# tensorflow_model_server --port=8500 --rest_api_port="${PORT}" --model_name="${MODEL_NAME}" --model_base_path="${MODEL_BASE_PATH}"/"${MODEL_NAME}" "$@"

# Expose is NOT supported by Heroku

# Expose ports
# gRPC
# EXPOSE 8500

# REST
# EXPOSE 8501
