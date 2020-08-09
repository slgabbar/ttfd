from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.core import serializers
from .forms import StatsForm
from .models import Stats

def postStats(request):
    # request should be ajax and method should be POST.
    if request.is_ajax and request.method == "POST":
        # get the form data
        form = StatsForm(request.POST)
        # save the data and after fetch the object in instance
        if form.is_valid():
            instance = form.save()
            # serialize in new friend object in json
            ser_instance = serializers.serialize('json', [ instance, ])
            # send to client side.
            return JsonResponse({"instance": ser_instance}, status=200)
        else:
            # some form errors occured.
            return JsonResponse({"error": form.errors}, status=400)

    # some error occured
    return JsonResponse({"error": ""}, status=400)
# Create your views here.

def deleteStats(request, pk):
    stat = get_object_or_404(Stats, pk=pk)
    if request.method == 'POST':
        stat.delete()
    return JsonResponse({"status": "ok"}, status=204)