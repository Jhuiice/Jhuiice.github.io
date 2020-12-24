from django.shortcuts import render, redirect, get_object_or_404
# from django.http import HttpResponse, HttpRequest
from django.views import View
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
# from django.core import validators
from django.contrib.auth.mixins import LoginRequiredMixin

from autos.models import Make, Auto
# from autos.forms import MakeForm

# Create your views here.

# class autos:
#     def main(self):
#         return HttpResponse("This is autos main")

#     def create_make(self):
#         return HttpResponse("This is autos main/create")

#     def view_make(self):
#         return HttpResponse("This is autos lookup, autos/lookup")

#     def add_make(self):
#         return HttpResponse("This is autos add make, lookup/create")

#     def delete(self):
#         return HttpResponse("""This is the autos delete section,
#                                 will be autos/lookup/<pk=""/delete>""")

#     def update(self):
#         return HttpResponse("""This is the autos update section,
#                                 will be autos/lookup/<pk=""/update>""")
# WE WANT TO USE MULTIPLE CLASSES. ONE FOR EACH PAGE TO CLARIFY WHAT WE
# ARE DOING EXAMPLE EXAMPLE EXAMPLES

class MainView(LoginRequiredMixin, View):
    def get(self, request):
        mc = Make.objects.all().count()
        al = Auto.objects.all()

        ctx = {'make_count': mc, 'auto_list': al}
        return render(request, 'autos/auto_main.html', ctx)


class MakeView(LoginRequiredMixin, View):
    def get(self, request):
        ml = Make.objects.all()
        ctx = {'make_list': ml}
        return render(request, 'autos/make_main.html', ctx)


# We use reverse_lazy() because we are in "constructor attribute" code
# that is run before urls.py is completely loaded
class MakeCreate(LoginRequiredMixin, CreateView):
    model = Make
    fields = '__all__'
    success_url = reverse_lazy('autos:make_view')


    # template = 'autos/make_form.html'
    # def get(self, request):
    #     form = MakeForm()
    #     ctx = {'form': form}
    #     return render(request, self.template, ctx)


    # def post(self, request):
    #     from = MakeForm(request.POST)
    #     if not form.is_valid():
    #         ctx = {'form': form}
    #         return render(request, self.template, ctx)

    #     make = form.save()
    #     return redirect(self,success_url)


# MakeUpdate has code to implement the get/post/validate/store flow
# AutoUpdate (below) is doing the same thing with no code
# and no form by extending UpdateView
class MakeUpdate(LoginRequiredMixin, UpdateView):
    model = Make
    fields = '__all__'
    success_url = reverse_lazy('autos:make_view')

    # template = 'autos/make_form.html'

    # def get(self, request, pk):
    #     make = get_object_or_404(self.model, pk=pk)
    #     form = MakeForm(request.POST, instance=make)
    #     if not form.is_valid():
    #         ctx = {'form': form}
    #         return render(request, self.template, ctx)

    #     form.save()
    #     return redirect(self.success_url)


class MakeDelete(LoginRequiredMixin, DeleteView):
    model = Make
    fields = '__all__'
    success_url = reverse_lazy('autos:make_view')

    # template = 'autos/make_confirm_delete.html'

    # def get(self, request, pk):
    #     make = get_object_or_404(self.model, pk=pk)
    #     form = MakeForm(instance=make)
    #     ctx = {'make': make}
    #     return render(request, self.template, ctx)

    # def post(self, request, pk):
    #     make = get_object_or_404(self.model, pk=pk)
    #     make.delete()
    #     return redirect(self.success_url)


# Take the easy way out on the main table
# These views do not need a form because CreateView, etc.
# Build a form object dynamically based on the fields
# value in the constructor attributes

# DO NOT HAVE TO CREATE FORMS WHEN USING GENERIC VIEWS
# GENERIC VIEWS CREATE THE FORMS FOR YOU
# NOTE: YOU STILL NEED A TEMPLATE AND IS ASIGNED TO A SPECIFIC NAME
class AutoCreate(LoginRequiredMixin, CreateView):
    model = Auto
    fields = '__all__'
    success_url = reverse_lazy('autos:all')


class AutoUpdate(LoginRequiredMixin, UpdateView):
    model = Auto
    fields = '__all__'
    success_url = reverse_lazy('autos:all')


class AutoDelete(LoginRequiredMixin, DeleteView):
    model = Auto
    fields = '__all__'
    success_url = reverse_lazy('autos:all')

# We use reverse_lazy rather than reverse in the class attributes
# because views.py is loaded by urls.py and in urls.py as_view() causes
# the constructor for the view class to run before urls.py has been
# completely loaded and urlpatterns has been processed.